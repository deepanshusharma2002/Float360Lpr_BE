const { CompanyMaster, AddressMaster, sequelize } = require("../../models");
const { generateSeries } = require("../../utilites/genrateSeries");
const { Op } = require("sequelize");

exports.createCompany = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { companyData, addressData } = req.body;
    companyData.company_series = (await generateSeries("CMP")) || "CMP-000-CMP";
    companyData.created_by = req.body.created_by;
    const company = await CompanyMaster.create(companyData, { transaction });

    addressData.forEach((data) => {
      data.entity_id = company.company_id;
      data.entity_type = "company";
      data.created_by = req.body.created_by;
      data.status = 1;
    });

    const address = await AddressMaster.bulkCreate(addressData, {
      transaction,
    });
    await transaction.commit();
    res.status(201).json({ company, address });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

//get company by id and all company
exports.getCompanies = async (req, res, next) => {
  const { companyId } = req.query;
  try {
    let companies;
    if (companyId) {
      companies = await CompanyMaster.findOne({
        where: { company_id: companyId },
        include: [
          {
            model: AddressMaster,
          },
        ],
      });
      if (!companies) {
        return res.status(404).json({ message: "Company not found" });
      }
    } else {
      companies = await CompanyMaster.findAll({
        include: [
          {
            model: AddressMaster,
          },
        ],
      });
    }

    res.status(200).json(companies);
  } catch (err) {
    next(err);
  }
};

// Get company according to vertical
exports.getCompanyByVertical = async (req, res, next) => {
  const vertical_id = req.query.vertical_id;
  try {
    const result = await CompanyMaster.findAll({
      include: { model: AddressMaster },
      where: {
        vertical_id: vertical_id,
        status: { [Op.ne]: 0 },
      },
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

//UPDATE COMPANY
exports.updateCompany = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { company_id } = req.query;
    const { companyData, addressData } = req.body;

    // Update company information
    const company = await CompanyMaster.findByPk(company_id, { transaction });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    await company.update(companyData, { transaction });

    // Update or add address information
    if (addressData && addressData.length > 0) {
      // Update existing addresses
      await Promise.all(
        addressData.map(async (data) => {
          if (data.address_id) {
            const address = await AddressMaster.findByPk(data.address_id, {
              transaction,
            });
            if (address) {
              await address.update(data, { transaction });
            }
          } else {
            // Add new addresses
            data.entity_id = company.company_id;
            data.entity_type = "company";
            data.created_by = req.body.created_by;
            await AddressMaster.create(data, { transaction });
          }
        })
      );
    }

    await transaction.commit();
    res.status(200).json({ message: "Company updated successfully", company });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

//DELTE COMPANY
exports.deleteCompany = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { company_id } = req.query;

    // Find the company to delete
    const company = await CompanyMaster.findByPk(company_id, { transaction });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Soft delete the company
    company.status = 0; // Assuming 0 represents deleted status
    await company.save({ transaction });

    // Soft delete related addresses
    await AddressMaster.update(
      { status: 0 }, // Assuming 0 represents deleted status
      { where: { entity_id: company_id, entity_type: "company" }, transaction }
    );

    await transaction.commit();
    res.status(204).json();
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

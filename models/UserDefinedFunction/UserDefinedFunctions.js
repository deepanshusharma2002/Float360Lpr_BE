const { sequelize } = require("../../models/index");

async function createUDFIfNotExists() {
  try {
    // SQL script to conditionally create the UDF if it does not exist
    const sql = `

      IF OBJECT_ID('dbo.fn_CountQuotationAgainstRFQ', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_CountQuotationAgainstRFQ(@RfqId INT)
          RETURNS INT
          AS 
          BEGIN
              DECLARE @ret INT;
              SELECT @ret = count(rfq_id)
              FROM [quotations_master] q
              WHERE q.rfq_id = @RfqId;
              RETURN @ret;
          END;
        ');
      END;
    
    IF OBJECT_ID('dbo.fn_GetUserName', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_GetUserName(@UserId INT)
          RETURNS VARCHAR(150)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(150);
              SELECT @ret = ISNULL(u.first_name+'' ''+u.last_name, ''Invalid UserId'')
              FROM [user] u
              WHERE u.user_id = @UserId;
              RETURN @ret;
          END;
        ');
      END;

    IF OBJECT_ID('dbo.fn_ShipmentTypeName', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_ShipmentTypeName(@ShipmentTypeId INT)
          RETURNS VARCHAR(150)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(150);
              -- Select shipment_type_name from shipment_type_master
              SELECT @ret = ISNULL(s.shipment_type_name, ''Invalid ShipmentType Code'')
              FROM shipment_type_master s
              WHERE s.shipment_type_id = @ShipmentTypeId;
              
              RETURN @ret;
          END;
        ');
      END;

      IF OBJECT_ID('dbo.fn_ShipmentModeName', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_ShipmentModeName(@ShipmentModeID INT)
          RETURNS VARCHAR(150)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(150);
              -- Select shipment_mode from shipment_mode
              SELECT @ret = ISNULL(s.shipment_mode_name, ''Invalid Shipment Code'')
              FROM shipment_mode s
              WHERE s.shipment_mode_id = @ShipmentModeID;
              RETURN @ret;
          END;
        ');
      END;


       IF OBJECT_ID('dbo.fn_CountryName', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_CountryName(@countryId VARCHAR(55))
          RETURNS VARCHAR(150)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(150);
              -- Select country from country
              SELECT @ret = ISNULL(c.country, ''Invalid Country Code'')
              FROM country c
              WHERE c.country_id = @countryId;
              
              RETURN @ret;
          END;
        ');
      END;
      

         IF OBJECT_ID('dbo.fn_StateName', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_StateName(@stateId VARCHAR(55))
          RETURNS VARCHAR(150)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(150);
              -- Select state from state
              SELECT @ret = ISNULL(s.state, ''Invalid state Code'')
              FROM state s
              WHERE s.state_id = @stateId;
              
              RETURN @ret;
          END;
        ');
      END;

       IF OBJECT_ID('dbo.fn_CityName', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_CityName(@cityId VARCHAR(55))
          RETURNS VARCHAR(150)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(150);
              -- Select city from city
              SELECT @ret = ISNULL(c.city, ''Invalid city Code'')
              FROM city c
              WHERE c.city_id = @cityId;
              
              RETURN @ret;
          END;
        ');
      END;


      IF OBJECT_ID('dbo.fn_UomName', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_UomName(@uomId INT)
          RETURNS VARCHAR(50)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(50);
              
              -- Select uom_name from unit_of_measurement
              SELECT @ret = ISNULL(v.uom_name, ''Invalid Vertical Code'')
              FROM unit_of_measurement v
              WHERE v.uom_id = @uomId;
              
              RETURN @ret;
          END;
        ');
      END;

       -- Check and create fn_containerType if it does not exist
      IF OBJECT_ID('dbo.fn_containerType', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_containerType(@containerTypeID INT)
          RETURNS VARCHAR(50)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(100);
              
              -- Select container_type_name from container_type_master
              SELECT @ret = ISNULL(c.container_type_name, ''Container Type Invalid'')
              FROM container_type_master c
              WHERE c.container_type_master_id = @containerTypeID;
              
              RETURN @ret;
          END;
        ');
      END;

           -- Check and create fn_containerPaymentTerm if it does not exist
      IF OBJECT_ID('dbo.fn_containerPaymentTerm', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_containerPaymentTerm(@paymentTermID INT)
          RETURNS VARCHAR(50)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(100);
              
              -- Select payment_term_container_name from payment_term_container_master
              SELECT @ret = ISNULL(p.payment_term_container_name, ''Payment Term Invalid'')
              FROM payment_term_container_master p
              WHERE p.payment_term_container_master_id = @paymentTermID;
              
              RETURN @ret;
          END;
        ');
      END;

       -- Check and create fn_transportPaymentType if it does not exist
      IF OBJECT_ID('dbo.fn_transportPaymentType', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_transportPaymentType(@paymentTypeID INT)
          RETURNS VARCHAR(50)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(100);
              
              -- Select payment_type_transport_name from payment_type_transport_master
              SELECT @ret = ISNULL(p.payment_type_transport_name, ''Payment Type Invalid'')
              FROM payment_type_transport_master p
              WHERE p.payment_type_transport_master_id = @paymentTypeID;
              
              RETURN @ret;
          END;
        ');
      END;

     -- Check and create fn_transportPaymentType if it does not exist
      IF OBJECT_ID('dbo.fn_GetCategoryName', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_GetCategoryName(@CategoryId INT)
          RETURNS VARCHAR(150)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(100);
              
              -- Select payment_type_transport_name from payment_type_transport_master
              SELECT @ret = ISNULL(c.category_name, ''Category Invalid'')
              FROM item_category_master c
              WHERE c.item_category_id = @CategoryId;
              
              RETURN @ret;
          END;
        ');
      END;

       -- Check and create fn_transportPaymentType if it does not exist
      IF OBJECT_ID('dbo.fn_GetPortDestinationName', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_GetPortDestinationName(@PortDestinationId INT)
          RETURNS VARCHAR(150)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(100);
              
              -- Select payment_type_transport_name from port_destination_master
              SELECT @ret = ISNULL(p.port_destination_name, ''Port Destination Invalid'')
              FROM port_destination_master p
              WHERE p.port_destination_id = @PortDestinationId;
              
              RETURN @ret;
          END;
        ');
      END;


        -- Check and create fn_transportPaymentType if it does not exist
      IF OBJECT_ID('dbo.fn_GetDeliveryTerm', 'FN') IS NULL
      BEGIN
        EXEC('
          CREATE FUNCTION dbo.fn_GetDeliveryTerm(@DeliveryTermId INT)
          RETURNS VARCHAR(150)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(100);
              
              -- Select delivery_terms_name from delivery_terms_quo
              SELECT @ret = ISNULL(d.delivery_terms_name, ''Delivery Terms Invalid'')
              FROM delivery_terms_quo d
              WHERE d.delivery_terms_id = @DeliveryTermId;
              
              RETURN @ret;
          END;
        ');
      END;

       -- Check and create fn_transportPaymentType if it does not exist
      IF OBJECT_ID('dbo.fn_GetPackageType', 'FN') IS NULL
      BEGIN
        EXEC(' b
          CREATE FUNCTION dbo.fn_GetPackageType(@PackageTypeId INT)
          RETURNS VARCHAR(150)
          AS 
          BEGIN
              DECLARE @ret VARCHAR(100);
              
              -- Select package_type from package_type_master
              SELECT @ret = ISNULL(p.package_type, ''Payment Terms Invalid'')
              FROM package_type_master p
              WHERE p.package_id = @PackageTypeId;
              
              RETURN @ret;
          END;
        ');
      END;
      

      IF OBJECT_ID('dbo.GetNamesFromIds', 'FN') IS NULL
      BEGIN
          EXEC('
              CREATE FUNCTION dbo.GetNamesFromIds (@Ids VARCHAR(MAX))
              RETURNS VARCHAR(MAX)
              AS 
              BEGIN
                  DECLARE @Result VARCHAR(MAX) = '''';
                  DECLARE @Id INT;

                  -- Create a table variable to hold split IDs
                  DECLARE @IdTable TABLE (Id INT);

                  -- Split the IDs and insert them into the table variable
                  WHILE LEN(@Ids) > 0
                  BEGIN
                      SET @Id = CAST(LEFT(@Ids, CHARINDEX('','', @Ids + '','') - 1) AS INT);
                      INSERT INTO @IdTable (Id) VALUES (@Id);
                      SET @Ids = STUFF(@Ids, 1, CHARINDEX('','', @Ids + '',''), '''');
                  END

                  -- Concatenate vendor_name and vendor_series
                  SELECT @Result = STRING_AGG(vendor_name + '' ('' + vendor_series + '')'', '','') 
                  FROM vendors_master 
                  WHERE vendor_id IN (SELECT Id FROM @IdTable);

                  RETURN @Result;
              END;
          ');
      END;



    -- Check and create GetMinDeliveryTimelineByRfqID if it does not exist
        IF OBJECT_ID('dbo.GetMinDeliveryTimelineByRfqID', 'FN') IS NULL
        BEGIN
            EXEC('
                CREATE FUNCTION dbo.GetMinDeliveryTimelineByRfqID(@rfq_id INT)
                RETURNS VARCHAR(50)
                AS 
                BEGIN
                    DECLARE @minDeliveryTimelineId VARCHAR(50);

                    SELECT @minDeliveryTimelineId = CAST(MIN(delivery_timeline_id) AS VARCHAR(50))
                    FROM opr_master
                    WHERE opr_id IN (SELECT opr_id FROM opr_items WHERE rfq_id = @rfq_id);

                    RETURN @minDeliveryTimelineId;
                END;
            ');
        END;



        IF OBJECT_ID('dbo.GetOpoNum', 'FN') IS NULL
          BEGIN
              EXEC('
                  CREATE FUNCTION dbo.GetOpoNum(@opoID INT)
                  RETURNS VARCHAR(50)
                  AS 
                  BEGIN
                      DECLARE @ret VARCHAR(100);
                      
                      SELECT @ret = ISNULL(o.opo_num, ''OPO Invalid'')
                      FROM opo_master o
                      WHERE o.opo_master_id = @opoID;
                      
                      RETURN @ret;
                  END;
              ');
          END;


          IF OBJECT_ID('dbo.fn_GetShippingContainerType', 'FN') IS NULL
          BEGIN
              EXEC('
                  CREATE FUNCTION dbo.fn_GetShippingContainerType(@containerTypeId INT)
                  RETURNS VARCHAR(50)
                  AS 
                  BEGIN
                      DECLARE @ret VARCHAR(50);
                      
                      -- Select container_type_name from shipping_advise_container_type_master
                      SELECT @ret = ISNULL(s.container_type_name, ''Invalid Vertical Code'')
                      FROM shipping_advise_container_type_master s
                      WHERE s.shipping_advise_container_type_master_id = @containerTypeId;
                      
                      RETURN @ret;
                  END;
              ');
          END;

       
    `;

    // IF OBJECT_ID('dbo.fn_GetContainerType', 'FN') IS NULL
    // BEGIN
    //     EXEC('
    //         CREATE FUNCTION dbo.fn_GetContainerType(@containerTypeId INT)
    //         RETURNS VARCHAR(150)
    //         AS 
    //         BEGIN
    //             DECLARE @ret VARCHAR(150);
                
    //             -- Select container_type_master from container_type_name
    //             SELECT @ret = ISNULL(s.container_type_name, ''Invalid Container Code'')
    //             FROM container_type_master s
    //             WHERE s.container_type_master_id = @containerTypeId;
                
    //             RETURN @ret;
    //         END;
    //     ');
    // END;

    // Log the SQL query for debugging
    console.log("Executing SQL:", sql);

    // Execute the SQL command
    await sequelize.query(sql, { type: sequelize.QueryTypes.RAW });

    console.log("UDF checked and created if not already present.");
  } catch (error) {
    // Log the error for debugging
    console.error("Error executing SQL:", error);
    if (error.original) {
      console.error("Original error details:", error.original);
    }
  }
}

// Execute the function to check and create the UDF
createUDFIfNotExists();

module.exports = createUDFIfNotExists;

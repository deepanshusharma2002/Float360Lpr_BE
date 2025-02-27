const {uploadVendor} = require('./multer');

const vendorDataSubmit = uploadVendor.fields([
  { name: 'vendor_name', maxCount: 1 }, // For vendor_name
  { name: 'address_line1', maxCount: 1 }, // For address_line1
  { name: 'address_line2', maxCount: 1 }, // For address_line2
  { name: 'city_id', maxCount: 1 }, // For city_id
  { name: 'country_id', maxCount: 1 }, // For country_id
  { name: 'state_id', maxCount: 1 }, // For state_id
  { name: 'postal_code', maxCount: 1 }, // For postal_code
  { name: 'phone_number', maxCount: 1 }, // For phone_number
  { name: 'alternate_phone_number', maxCount: 1 }, // For alternate_phone_number
  { name: 'email', maxCount: 1 }, // For email
  { name: 'contact_person', maxCount: 1 }, // For contact_person
  { name: 'contact_person_phone', maxCount: 1 }, // For contact_person_phone
  { name: 'contact_person_email', maxCount: 1 }, // For contact_person_email
  { name: 'tax_id', maxCount: 1 }, // For tax_id
  { name: 'payment_terms', maxCount: 1 }, // For payment_terms
  { name: 'bank1_name', maxCount: 1 }, // For bank1_name
  { name: 'bank1_account_number', maxCount: 1 }, // For bank1_account_number
  { name: 'bank1_ifsc_code', maxCount: 1 }, // For bank1_ifsc_code
  { name: 'bank1_ref_cheque', maxCount: 1 }, // For bank1_ref_cheque
  { name: 'bank2_name', maxCount: 1 }, // For bank2_name
  { name: 'bank2_account_number', maxCount: 1 }, // For bank2_account_number
  { name: 'bank2_ifsc_code', maxCount: 1 }, // For bank2_ifsc_code
  { name: 'bank2_ref_cheque', maxCount: 1 }, // For bank2_ref_cheque
  { name: 'last_audited_docs', maxCount: 1 }, // For last_audited_docs
  { name: 'pan_num', maxCount: 1 }, // For pan_num
  { name: 'tin_num', maxCount: 1 }, // For tin_num
  { name: 'gst_num', maxCount: 1 }, // For gst_num
  { name: 'vat_num', maxCount: 1 }, // For vat_num
  { name: 'reference_by', maxCount: 1 }, // For reference_by
  { name: 'vendor_type', maxCount: 1 }, // For vendor_type
  { name: 'vendor_status', maxCount: 1 }, // For vendor_status
  { name: 'registration_date', maxCount: 1 }, // For registration_date
  { name: 'compliance_status', maxCount: 1 }, // For compliance_status
  { name: 'notes', maxCount: 1 }, // For notes
  { name: 'created_by', maxCount: 1 }, // For created_by
])




module.exports = { vendorDataSubmit};
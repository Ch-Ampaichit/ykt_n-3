// const endpoint = "http://fn3.yokoyama.local:8000/";
const endpoint = "http://localhost:8000/";

const api_endpoint = endpoint.concat("api/");
const auth_endpoint = endpoint.concat("auth/");
const report_endpoint = endpoint.concat("report/");

export const auth_url = {
  root: auth_endpoint,
  login: auth_endpoint.concat("login"),
  user: auth_endpoint.concat("user"),
  logout: auth_endpoint.concat("logout/"),
};

export const api_url = {
  items: api_endpoint.concat("items/"),
  vendors: api_endpoint.concat("vendors/"),
  itemCategories: api_endpoint.concat("item-categories/"),
  unitsOfMeasure: api_endpoint.concat("units-of-measure/"),
  mrp_page: api_endpoint.concat("mrp_worksheet/"),
  mrp_journal_batch: api_endpoint.concat("mrp_jnl_batch/"),
  mrp_journal_line: api_endpoint.concat("mrp_journal_line/"),
  import_mrp: api_endpoint.concat("mrp_journal_line/import_data/"),
  clear_all_jnl_line: api_endpoint.concat("mrp_journal_line/clear_all/"),
  vendor_forecast: api_endpoint.concat("vendor_forecast/"),
  posted_vendor_forecast: api_endpoint.concat("posted_vendor_forecast/"),
  gen_vend_forecast: api_endpoint.concat("gen_vend_forecast/"),
  vend_forecast_detail: api_endpoint.concat("vendor_forecast_detail/"),
  mrp_sum_report: api_endpoint.concat("reports/mrp_summary_preview/"),
  person: api_endpoint.concat("person/"),
  contacts: api_endpoint.concat("contact/"),
};

export const report_url = {
  vendor_forecast: report_endpoint.concat("vendor_forecast/"),
  posted_vendor_forecast: report_endpoint.concat("posted_vendor_forecast/"),
};
// export const url = {
//   root: endpoint,
//   login: endpoint.concat("auth/", "login"),
//   user: endpoint.concat("auth/", "user"),
//   logout: endpoint.concat("auth/", "logout"),

//   items: endpoint.concat("api/", "items"),
//   vendors: endpoint.concat("api/", "vendors"),
//   mrp_page: endpoint.concat("api/", "mrp_worksheet/"),
//   mrp_journal_batch: endpoint.concat("api/", "mrp_jnl_batch/"),
//   mrp_journal_line: endpoint.concat("api/", "mrp_journal_line/"),
//   import_mrp: endpoint.concat("api/", "mrp_journal_line/import_data/"),
//   clear_all_jnl_line: endpoint.concat("api/", "mrp_journal_line/clear_all/"),
//   vendor_forecast: endpoint.concat("api/", "vendor_forecast/"),
//   gen_vend_forecast: endpoint.concat("api/", "gen_vend_forecast/"),
//   vend_forecast_detail: endpoint.concat("api/", "vendor_forecast_detail/"),
// };

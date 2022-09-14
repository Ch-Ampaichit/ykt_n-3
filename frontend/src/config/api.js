const rootPath = "http://OFF-00397:8000/";

export const url = {
  root: rootPath,
  login: rootPath.concat("auth/", "login"),
  user: rootPath.concat("auth/", "user"),
  logout: rootPath.concat("auth/", "logout"),
  items: rootPath.concat("api/", "items"),
  vendors: rootPath.concat("api/", "vendors"),
  mrp_page: rootPath.concat("api/", "mrp_worksheet/"),
  mrp_journal_batch: rootPath.concat("api/", "mrp_jnl_batch/"),
  mrp_journal_line: rootPath.concat("api/", "mrp_journal_line/"),
  import_mrp: rootPath.concat("api/", "mrp_journal_line/import_data/"),
  clear_all_jnl_line: rootPath.concat("api/", "mrp_journal_line/clear_all/"),
};

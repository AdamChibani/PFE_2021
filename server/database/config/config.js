module.exports = {
  development: {
    username: "root",
    password: null,
    database: "pfe",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  folders: {
    upload_main: "public/uploads/",
    upload_image: "public/uploads/images/",
    upload_user: "public/uploads/images/users/",
    upload_misc: "public/uploads/misc/",
    upload_misc_image: "public/uploads/images/misc/",
    upload_content_image: "public/uploads/images/content/",
    upload_menu_categories: "public/uploads/images/menu-categories/",
  },
};

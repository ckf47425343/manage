export const routes = [
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/Test.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/usermanage/:userId",
    name: "UserManage",
    component: () => import("../views/UserManage.vue"),
  },
  { 
    path: "*", 
    redirect: { name: "ProductList" }
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/Main.vue"),
    children: [
      {
        path: "salecount",
        name: "SaleCount",
        component: () => import("../views/SaleCount.vue"),
      },
      {
        path: "postProduct",
        name: "PostProduct",
        component: () => import("../views/PostProduct.vue"),
      },
      {
        path: "productList",
        name: "ProductList",
        component: () => import("../views/ProductList.vue"),
      },
      {
        path: "uploadbanner",
        name: "UploadBanner",
        component: () => import("../views/UploadBanner.vue"),
      },
      {
        path: "advertisinglist",
        name: "AdvertisingList",
        component: () => import("../views/AdvertisingList.vue"),
      },
    ],
  },
];

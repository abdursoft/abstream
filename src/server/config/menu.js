export const menus = {
  "header" : [
    {
      EN: "Home",
      BN: "হোম",
      path:"home",
      isAuth: null,
    },
    {
      EN: "Login",
      BN: "লগইন",
      path:"login",
      isAuth: false,
    },
    {
      EN: "Register",
      BN: "নিবন্ধন",
      path:"register",
      isAuth: false,
    },
    {
      EN: "Profile",
      BN: "প্রোফাইল",
      path:"profile",
      isAuth: "true",
    },
    {
      EN: "Deposit",
      BN: "আমানত",
      path:"payment",
      isAuth: "true",
    },
    {
      EN: "Logout",
      BN: "লগআউট",
      path:"",
      isAuth: "true",
    }
  ],
  "authFooter":[
    {
      EN: "Home",
      BN: "হোম",
      path:"home",
      icon:"/images/home.svg"
    },
    {
      EN: "Promotion",
      BN: "প্রমোশন",
      path:"profile",
      icon:"/images/promotion.svg"
    },
    {
      EN: "Deposit",
      BN: "আমানত",
      path:"payment",
      icon:"/images/deposit.svg"
    },
    {
      EN: "Profile",
      BN: "প্রোফাইল",
      path:"profile",
      icon:"/images/mine.svg"
    },
  ]
}

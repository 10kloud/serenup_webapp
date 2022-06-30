import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import AddBracialetView from '../views/AddBracialetView.vue'
import AddContactView from '../views/AddContactView.vue'
import { storeCognito } from '@/stores/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView
    },
    {
      path: "/registration",
      name: "registration",
      component: RegistrationView
    },
    {
      path: "/addbracialet",
      name: "addbracialet",
      component: AddBracialetView
    },
    {
      path: "/addcontact",
      name: "addcontact",
      component: AddContactView
    }
  ]
})

async function checkLogged(store){

  var poolData = store.getPoolData
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var cognitoUser = userPool.getCurrentUser();
  
  if(cognitoUser == null)
    return false

  if(store.getCognitoUser == null)
    store.setCognitoUser(cognitoUser)

  return await user(cognitoUser)
}

function user(cognitoUser){
  return new Promise((resolve, reject) => {
    cognitoUser.getSession(function(err, result) {
      if (result && result.isValid())
      {
        return resolve(true)
      }
      else
      {
        return resolve(false)
      }
    });
  })
}

router.beforeEach(async (to, from) => {
  var store = storeCognito()

  var check = await checkLogged(store)

  if(to.path === "/dashboard" && check == false)
  {
    router.push("/login")
  }else if((to.path === "/login" || to.path === "/registration") && check == true)
  {
    router.push("/dashboard")
  }else if(to.path === "/")
  {
    router.push("/login")
  }
  
  return true
})

export default router

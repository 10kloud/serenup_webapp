import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import AddContactView from '../views/AddContactView.vue'
import { storeCognito } from '@/stores/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      requireAuth: false
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      requireAuth: true
    },
    {
      path: "/registration",
      name: "registration",
      component: RegistrationView,
      requireAuth: false
    },
    {
      path: "/addcontact",
      name: "addcontact",
      component: AddContactView,
      requireAuth: true
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

  var routers = router.options.routes;

  if(routers.map(e=> e.requireAuth == true && e.path === to.path).find(e => e == true) && check == false)
  {
    router.push("/login")
  }else if(routers.map(e=> e.requireAuth == false && e.path === to.path).find(e => e == true) && check == true)
  {
    router.push("/dashboard")
  }else if(to.path === "/")
  {
    router.push("/login")
  }
  
  return true
})

export default router
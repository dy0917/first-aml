// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }

import Home from "./pages/Home"
import CompanyEdit from "./pages/CompanyEdit"

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
export const routes = [
  { path: '/', component: Home },
  { path: '/newCompany', component: CompanyEdit },
  
//   { path: '/bar', component: Bar } 
]
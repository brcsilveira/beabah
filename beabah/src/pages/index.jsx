import { BrowserRouter, Navigate, Route, Routes, Link } from 'react-router-dom'
import { Login } from './login/Login'
import { ForgotPassword } from './login/ForgotPassword'
import { UserManagement } from './userManagement/UserManagement'
import { RegisterNewPassword } from './login/RegisterNewPassword'
import { ContainerNotLogged } from '../components/ContainerNotLogged'
import { Header } from '../components/Header'
import { RegisterUser } from './userManagement/RegisterUser'
import { EditUser } from './userManagement/EditUser'
import { LinkProfile } from './userManagement/LinkProfile'
import { CreateProfilesTF } from './profileManagement/CreateProfilesTF'
import { AssociateModules } from './profileManagement/AssociateModules'
import { CreateModule } from './moduleManagement/CreateModule'
import { EditModule } from './moduleManagement/EditModule'
import { SelectTransactions } from './moduleManagement/SelectTransactions'
import { EditTransaction } from './transactionManagement/EditTransaction'
import { CreateTransaction } from './transactionManagement/CreateTransaction'
import { EditFunction } from './functionManagement/EditFunction'
import { CreateFunction } from './functionManagement/CreateFunction'
import { EditUsers } from './userManagement/EditUsers'
import { DeleteUsers } from './userManagement/DeleteUsers'
import { LinkProfiles } from './userManagement/LinkProfiles'
import { ViewUsers } from './userManagement/ViewUsers'
import { ProfileManagement } from './profileManagement/ProfileManagement'
import { EditProfiles } from './profileManagement/EditProfiles'
import { DeleteProfiles } from './profileManagement/DeleteProfiles'
import { SelectProfiles } from './profileManagement/SelectProfiles'
import { EditModules } from './moduleManagement/EditModules'
import { DeleteModules } from './moduleManagement/DeleteModules'
import { ViewModules } from './moduleManagement/ViewModules'
import { TransactionManagement } from './transactionManagement/TransactionManagement'
import { SelectModulesT } from './transactionManagement/SelectModulesT'
import { SelectModulesF } from './functionManagement/SelectModulesF'
import { EditTransactions } from './transactionManagement/EditTransactions'
import { DeleteTransactions } from './transactionManagement/DeleteTransactions'
import { ViewTransactions } from './transactionManagement/ViewTransactions'
import { ModuleManagement } from './moduleManagement/ModuleManagement'
import { FunctionManagement } from './functionManagement/FunctionManagement'
import { EditFunctions } from './functionManagement/EditFunctions'
import { DeleteFunctions } from './functionManagement/DeleteFunctions'
import { ViewFunctions } from './functionManagement/ViewFunctions'
import { SelectUsers } from './userManagement/SelectUsers'
import { EditProfile } from './profileManagement/EditProfile'
import { ViewProfiles } from './profileManagement/ViewProfiles'
import { AssignTransactions } from './transactionManagement/AssignTransactions'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route path="/userManagement" element={<UserManagement />} />
          <Route path="/registerUser" element={<RegisterUser />} />
          <Route path="/editUser/:userId" element={<EditUser />} />
          <Route path="/linkProfile/:userId" element={<LinkProfile />} />
          <Route path="/createProfilesTF" element={<CreateProfilesTF />} />
          <Route path="/associateModules/:profileId" element={<AssociateModules />} />
          <Route path="/createModule" element={<CreateModule />} />
          <Route path="/editModule/:moduleId" element={<EditModule />} />
          <Route path="/selectTransactions" element={<SelectTransactions />} />
          <Route path="/editTransaction/:transactionId" element={<EditTransaction />} />
          <Route path="/createTransaction" element={<CreateTransaction />} />
          <Route path="/editFunction/:functionId" element={<EditFunction />} />
          <Route path="/editUsers" element={<EditUsers />} />
          <Route path="/deleteUsers" element={<DeleteUsers />} />
          <Route path="/linkProfiles/:userId" element={<LinkProfiles />} />
          <Route path="/viewUsers" element={<ViewUsers />} />
          <Route path="/profileManagement" element={<ProfileManagement />} />
          <Route path="/editProfiles" element={<EditProfiles />} />
          <Route path="/deleteProfiles" element={<DeleteProfiles />} />
          <Route path="/selectProfiles" element={<SelectProfiles />} />
          <Route path="/editModules" element={<EditModules />} />
          <Route path="/deleteModules" element={<DeleteModules />} />
          <Route path="/viewModules" element={<ViewModules />} />
          <Route path="/transactionManagement" element={<TransactionManagement />} />
          <Route path="/selectModulesT" element={<SelectModulesT />} />
          <Route path="/selectModulesF/" element={<SelectModulesF />} />
          <Route path="/editTransactions" element={<EditTransactions />} />
          <Route path="/deleteTransactions" element={<DeleteTransactions />} />
          <Route path="/viewTransactions" element={<ViewTransactions />} />
          <Route path="/moduleManagement" element={<ModuleManagement />} />
          <Route path="/functionManagement" element={<FunctionManagement />} />
          <Route path="/editFunctions" element={<EditFunctions />} />    
          <Route path="/deleteFunctions" element={<DeleteFunctions />} />      
          <Route path="/viewFunctions" element={<ViewFunctions />} /> 
          <Route path="/createFunction/:moduleId" element={<CreateFunction />} />
          <Route path="/selectUsers" element={<SelectUsers />} />
          <Route path="/editProfile/:profileId" element={<EditProfile />} />
          <Route path="/viewProfiles" element={<ViewProfiles />} />
          <Route path="/assignTransactions/:moduleId" element={<AssignTransactions />} />
        </Route>
        <Route element={<ContainerNotLogged />}>
          <Route path="/registerNewPassword" element={<RegisterNewPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { Router }
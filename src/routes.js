import React from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import Calendar from './pages/Calendars'
//import LiveViewVideos from './pages/LiveViewVideos'
import Home from './pages/Home'
//import About from './pages/About'
import BidDocuments from './pages/BidDocuments'
import Prequalification from './pages/Prequalification'
import HomeMain from './pages/HomeMain'
import Contacts from './pages/Contact'
//import Privacy from './pages/PrivacyPolicy'
//import Admin from './pages/Admin'


const Routes = () => {
    return (
      <div>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/projects/prequalification" component={Prequalification} />
        <Route exact path="/projects/contact" component={Contacts} />
        <Route exact path="/projects/:projectId" component={HomeMain} />
        <Route exact path="/projects/:projectId/calendar" component={Calendar} />
        <Route exact path="/projects/:projectId/bidDocuments" component={BidDocuments} />
        <Redirect to="/home" component={Home}/>
      </Switch>
      </div>
    )
  }

  export default Routes 
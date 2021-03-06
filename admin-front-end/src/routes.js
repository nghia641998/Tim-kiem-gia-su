import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import EmptyLayout from "./layouts/Empty";

// Route Views
import Errors from "./views/Errors";
import Login from "./containers/LoginContainer";
import CreateNewAccount from "./containers/CreateUserContainer";
import UserProfile from "./views/UserProfile";
import TagSkill from "./views/TagSkill";
import ManagerUsers from "./views/ManagerTeachers";
import ManagerStudents from "./views/ManagerStudents";
import UserDetail from "./views/UserDetail";
import Contract from "./views/Contract";
import Complaint from "./views/Complaint";
import IncomeOverview from "./views/IncomeOverview";
import TopTeacherIncome from "./views/TopTeacherIncome";
import TopSkillIncome from "./views/TopSkillIncome";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/login",
    layout: EmptyLayout,
    component: Login
  },
  {
    path: "/create-account",
    layout: DefaultLayout,
    component:CreateNewAccount 
  },
  {
    path: "/user-profile",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/tag-skill",
    layout: DefaultLayout,
    component: TagSkill
  },
  {
    path: "/manager-teacher",
    layout: DefaultLayout,
    component: ManagerUsers
  },
  {
    path: "/manager-student",
    layout: DefaultLayout,
    component: ManagerStudents
  },
  {
    path: "/user-detail/:id",
    layout: DefaultLayout,
    component: UserDetail
  },
  {
    path: "/manager-contract",
    layout: DefaultLayout,
    component: Contract
  },
  {
    path: "/manager-complaint",
    layout: DefaultLayout,
    component: Complaint
  },
  {
    path: "/income-overview",
    layout: DefaultLayout,
    component: IncomeOverview
  },
  {
    path: "/top-teacher-income",
    layout: DefaultLayout,
    component: TopTeacherIncome
  },
  {
    path: "/top-skill-income",
    layout: DefaultLayout,
    component: TopSkillIncome
  },
  {

    layout: DefaultLayout,
    component: Errors
  },
];

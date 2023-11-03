import useVerify from "./useVerify";

const Role = {
  SUPER_ADMIN: {
    role: "SUPER_ADMIN",
    pages: [
      "home",
      "statistics",
      "admin",
      "admin/user",
      "admin/owner",
      "status-aparat",
      "status-aparat-current",
      "group",
      "about-aparat",
      "about-aparat/information",
      "about-aparat/complectation",
      "about-aparat/service",
      "about-aparat/control",
      "about-aparat/information/edit",
      "about-aparat/complectation/edit",
      "about-aparat/service/edit",
      "about-aparat/control/edit",
    ],
  },
  DEALER: {
    role: "DEALER",
    pages: [
      "home",
      "admin",
      "admin/user",
      "admin/owner",
      "statistics",
      "about-aparat",
      "about-aparat/information",
      "about-aparat/complectation",
      "about-aparat/service",
      "about-aparat/control",
      "about-aparat/information/edit",
      "about-aparat/complectation/edit",
      "about-aparat/service/edit",
      "status-aparat",
      "status-aparat-current",
    ],
  },
  OPERATOR: {
    role: "OPERATOR",
    pages: [
      "home",
      "about-aparat",
      "about-aparat/information",
      "about-aparat/complectation",
      "about-aparat/service",
      "about-aparat/control",
      "about-aparat/complectation/edit",
      "about-aparat/service/edit",
      "about-aparat/control/edit",
      "status-aparat",
      "status-aparat-current",
    ],
  },
  CLIENT: {
    role: "CLIENT",
    pages: [
      "home",
      "admin",
      "admin/user",
      "about-aparat",
      "about-aparat/information",
      "about-aparat/complectation",
      "about-aparat/service",
      "about-aparat/control",
      "about-aparat/control/edit",
      "statistics",
      "status-aparat",
      "status-aparat-current",
      "group",
    ],
  },
  ADMIN: {
    role: "ADMIN",
    pages: [
      "home",
      "admin",
      "admin/user",
      "about-aparat",
      "about-aparat/information",
      "about-aparat/complectation",
      "about-aparat/service",
      "about-aparat/control",
      "about-aparat/control/edit",
      "status-aparat",
      "status-aparat-current",
      "group",
    ],
  },
  MANAGER: {
    role: "MANAGER",
    pages: [
      "home",
      "about-aparat",
      "about-aparat/information",
      "about-aparat/complectation",
      "about-aparat/service",
      "about-aparat/control",
      "about-aparat/control/edit",
      "status-aparat",
      "status-aparat-current",
      "group",
    ],
  },
};

const useGuard = async (page) => {
  const { verify, dataFetch } = await useVerify();

  if (!verify) return false;

  return Role[dataFetch.role].pages.includes(page);
};

export default useGuard;

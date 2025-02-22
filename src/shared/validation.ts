export const validateEmail = (email: string) => {
  const emailPattern = /^(?=.{5,254}$)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$/;
  if (!emailPattern.test(email)) {
    return false;
  }

  const [mailbox, hostname] = email.split('@');

  if (!mailbox || !hostname) {
    return false;
  }
  if (email.split('@').length > 2) {
    return false;
  }

  if (mailbox.includes('..') || hostname.includes('..')) {
    return false;
  }

  return true;
};

export const validatePassword = (password: string) => {
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-()@$!%*?&#^])[A-Za-z\d-()@$!%*?&#^]{6,}$/;
  return passwordPattern.test(password);
};

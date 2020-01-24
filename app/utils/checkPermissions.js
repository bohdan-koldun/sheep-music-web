export default function checkUserPermissions(user, roles) {
  const userRoles =
    user &&
    user.roles &&
    user.roles.map(role => role && role.role.slug).join(',');

  if (user && Array.isArray(roles)) {
    return new RegExp(Array.isArray(roles) ? roles.join('|') : roles).test(
      userRoles,
    );
  }

  return false;
}

export const isAdminOrModerator = user =>
  checkUserPermissions(user, ['admin', 'moderator']);

UPDATE users
SET password = ${password},
WHERE reset_password_token = ${reset_password_token}
RETURNING *;

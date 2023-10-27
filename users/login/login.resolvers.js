import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

```
  로그인
```;

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }
      const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};


import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { Post } from "./posts/entities/post.entity";
import { SavedPostContainer } from "./saved-posts/entities/saved-post.entity";
import { UserInfo } from "./users/entities/user-info.entity";
import { User } from "./users/entities/user.enitity";

const databaseConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Three-panda',
    database: 'social-backend',
    entities: [Post, User, UserInfo, SavedPostContainer],
    synchronize: true,
}

export default databaseConfig;
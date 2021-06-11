using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParentPortal.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace ParentPortal.DataAccess
{
    public class UserRepository
    {
        const string ConnectionString = "Server=localhost;Database=ParentPortal;Trusted_Connection=True;";

        public List<User> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [user]";

            return db.Query<User>(sql).ToList();
        }

        public List<User> GetUnregisteredUsers()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [user]";

            return db.Query<User>(sql).ToList();
        }

        public User Get(int id)
        {
            var sql = @"SELECT *
                        FROM [User]
                        WHERE id = @id";

            using var db = new SqlConnection(ConnectionString);

            var singleUser = db.QueryFirstOrDefault<User>(sql, new { id = id });

            return singleUser;
        }

        public User GetByFBUid(string fb_uid)
        {
            var sql = @"SELECT *
                        FROM [User]
                            WHERE fb_uid = @fb_uid";

            using var db = new SqlConnection(ConnectionString);

            var singleUser = db.QueryFirstOrDefault<User>(sql, new { fb_uid = fb_uid });

            return singleUser;
        }

        public void Add(User user)
        {
            var sql = @"INSERT INTO [dbo].[user]
                                ([classroom_id]
                                ,[first_name]
                                ,[last_name]
                                ,[is_teacher]
                                ,[is_parent]
                                ,[is_admin]
                                ,[student_id]
                                ,[fb_uid]
                                ,[email]
                                ,[is_registered])
                        OUTPUT INSERTED.id 
                        VALUES(@classroom_id, @first_name, @last_name, @is_teacher, @is_parent, @is_admin, @student_id, @fb_uid, @email, @is_registered)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, user);

            user.id = id;
        }

        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM [User]
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }

        public void Update(User user)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE [User]
                        SET classroom_id = @classroom_id,
                            first_name = @first_name,
                            last_name = @last_name,
	                        is_teacher = @is_teacher,
	                        is_parent = @is_parent,
	                        is_admin = @is_admin,
                            student_id = @student_id,
                            email = @email,
                            is_registered = @is_registered
                        WHERE id = @id";

            db.Execute(sql, user);
        }
    }
}

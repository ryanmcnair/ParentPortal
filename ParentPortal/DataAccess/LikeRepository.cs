using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParentPortal.Models;
using Microsoft.Data.SqlClient;
using Dapper;


namespace ParentPortal.DataAccess
{
    public class LikeRepository
    {
        const string ConnectionString = "Server=localhost;Database=ParentPortal;Trusted_Connection=True;";

        public List<Like> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [like]";

            return db.Query<Like>(sql).ToList();
        }

        public List<LikeUser> GetLikeByAssignment(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT l.*, u.first_name, u.last_name
                        FROM [like] l
	                        JOIN [user] u
	                        ON l.user_id = u.id
	                            WHERE l.assignment_id = @id";

            return db.Query<LikeUser>(sql, new { id = id }).ToList();
        }

        public List<LikeUser> GetLikeByAssignmentAndUser(int assignmentid, int userid)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT l.*, u.first_name, u.last_name
                        FROM [like] l
	                        JOIN [user] u
	                        ON l.user_id = u.id
	                            WHERE l.assignment_id = @assignmentid
                                AND l.user_id = @userid";

            return db.Query<LikeUser>(sql, new { assignmentid = assignmentid, userid = userid }).ToList();
        }

        public void Add(Like like)
        {
            var sql = @"INSERT INTO [dbo].[like]
                        ([assignment_id]
                        ,[user_id])
                        OUTPUT INSERTED.id
                        VALUES
                        (@assignment_id, @user_id)";
                        

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, like);

            like.id = id;
        }

        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM [like]
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParentPortal.Models;
using Microsoft.Data.SqlClient;
using Dapper;


namespace ParentPortal.DataAccess
{
    public class CommentRepository
    {
        const string ConnectionString = "Server=localhost;Database=ParentPortal;Trusted_Connection=True;";

        public List<Comment> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM comment";

            return db.Query<Comment>(sql).ToList();
        }
        public List<CommentUser> GetCommentByAssignment(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT c.*, u.first_name, u.last_name
                        FROM comment c
                            JOIN [user] u
	                        ON c.user_id = u.id
                            WHERE assignment_id = @id";

            return db.Query<CommentUser>(sql, new { id = id }).ToList();
        }

        public void Add(Comment comment)
        {
            var sql = @"INSERT INTO [dbo].[comment]
                        ([assignment_id]
                        ,[user_id]
                        ,[comment])
                        OUTPUT INSERTED.id
                        VALUES
                        (@assignment_id, @user_id, @comment)";


            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, comment);

            comment.id = id;
        }

        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM comment
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }
    }
}

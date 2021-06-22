using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParentPortal.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace ParentPortal.DataAccess
{
    public class MessageCommentRepository
    {
        const string ConnectionString = "Server=localhost;Database=ParentPortal;Trusted_Connection=True;";

        public List<MessageCommentAddWithUser> GetCommentByMessage(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT m.*, u.first_name, u.last_name
                        FROM message_comment m
                            JOIN [user] u
	                        ON m.user_id = u.id
                            WHERE message_id = @id
							ORDER BY m.id ASC";

            return db.Query<MessageCommentAddWithUser>(sql, new { id = id }).ToList();
        }

        public void Add(MessageCommentAdd comment)
        {
            var sql = @"INSERT INTO [dbo].[message_comment]
                        ([message_id]
                        ,[user_id]
                        ,[comment])
                        OUTPUT INSERTED.id
                        VALUES
                        (@message_id, @user_id, @comment)";


            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, comment);

            comment.id = id;
        }

        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM message_comment
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }
    }
}

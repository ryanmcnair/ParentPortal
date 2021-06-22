using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParentPortal.Models;
using Microsoft.Data.SqlClient;
using Dapper;


namespace ParentPortal.DataAccess
{
    public class MessageRepository
    {
        const string ConnectionString = "Server=localhost;Database=ParentPortal;Trusted_Connection=True;";

        public List<MessageComment> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT m.*, u.first_name, u.last_name
                        FROM message m
	                        JOIN [user] u
	                        ON m.user_id = u.id
		                    ORDER BY m.id DESC";

            return db.Query<MessageComment>(sql).ToList();
        }

        public void Add(Message message)
        {
            var sql = @"INSERT INTO [dbo].[message]
                        ([user_id]
                         ,[title]
                         ,[text])
                        OUTPUT INSERTED.id 
                        VALUES
                        (@user_id, @title, @text)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, message);

            message.id = id;
        }

        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM message
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }
    }
}

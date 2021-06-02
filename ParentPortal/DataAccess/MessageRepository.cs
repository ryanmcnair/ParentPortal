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

        public List<Message> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM message";

            return db.Query<Message>(sql).ToList();
        }

        public List<Message> GetMessagesBySender(string fb_uid)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT m.id, m.sender_id, m.recipient_id, m.message
                        FROM message m
	                        join [user] u
	                        ON m.sender_id = u.id
		                        WHERE u.fb_uid = @fb_uid";

            return db.Query<Message>(sql, new { fb_uid = fb_uid }).ToList();
        }

        public List<Message> GetMessagesByRecipient(string fb_uid)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT m.id, m.sender_id, m.recipient_id, m.message
                        FROM message m
	                        join [user] u
	                         ON m.recipient_id = u.id
	                        	WHERE u.fb_uid = @fb_uid";

            return db.Query<Message>(sql, new { fb_uid = fb_uid }).ToList();
        }

        public void Add(Message message)
        {
            var sql = @"INSERT INTO [dbo].[message]
                        ([sender_id]
                         ,[recipient_id]
                         ,[message])
                        OUTPUT INSERTED.id 
                        VALUES
                        (@sender_id, @recipient_id, @message)";

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

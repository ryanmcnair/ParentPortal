﻿using System;
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

        public List<Message> GetMessagesBySender(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT m.*, us.first_name as sender_first, us.last_name as sender_last, ur.first_name as recipient_first, ur.last_name as recipient_last
                        FROM message m
	                        JOIN [user] us
	                        ON m.sender_id = us.id
	                        JOIN [user] ur
	                        ON m.recipient_id = ur.id
		                        WHERE us.id = @id
		                        ORDER BY m.id ASC";

            return db.Query<Message>(sql, new { id = id }).ToList();
        }

        public List<Message> GetMessagesByRecipient(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT m.*, ur.first_name as recipient_first, ur.last_name as recipient_last, us.first_name as sender_first, us.last_name as sender_last
                        FROM message m
	                        JOIN [user] ur
	                        ON m.recipient_id = ur.id
	                        JOIN [user] us
	                        ON m.sender_id = us.id
		                        WHERE ur.id = @id
		                        ORDER BY m.id ASC";

            return db.Query<Message>(sql, new { id = id }).ToList();
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

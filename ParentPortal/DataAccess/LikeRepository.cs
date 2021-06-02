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

        public List<Like> GetLikeByAssignment(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM [like]
                            WHERE assignment_id = @id";

            return db.Query<Like>(sql, new { id = id }).ToList();
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

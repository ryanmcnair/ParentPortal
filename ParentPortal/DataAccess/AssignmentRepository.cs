using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParentPortal.Models;
using Microsoft.Data.SqlClient;
using Dapper;


namespace ParentPortal.DataAccess
{
    public class AssignmentRepository
    {
        const string ConnectionString = "Server=localhost;Database=ParentPortal;Trusted_Connection=True;";

        public List<Assignment> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM assignment";

            return db.Query<Assignment>(sql).ToList();
        }

        public Assignment Get(int id)
        {
            var sql = @"SELECT *
                        FROM assignment
                        WHERE id = @id";

            using var db = new SqlConnection(ConnectionString);

            return db.QueryFirstOrDefault<Assignment>(sql, new { id = id });

        }

        public List<Assignment> GetAssignmentByClassroom(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM assignment
                            WHERE classroom_id = @id
                            ORDER BY date_added DESC";

            return db.Query<Assignment>(sql, new { id = id }).ToList();
        }

        public void Add(Assignment assignment)
        {
            var sql = @"INSERT INTO [dbo].[assignment]
                        ([classroom_id]
                        ,[teacher_id]
                        ,[pdf_url]
                        ,[date_due]
                        ,[text]
                        ,[title])
                        OUTPUT INSERTED.id 
                        VALUES
                        (@classroom_id, @teacher_id, @pdf_url, @date_due, @text, @title)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, assignment);

            assignment.id = id;
        }

        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM assignment
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }

        public void Update(Assignment assignment)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE assignment
                        SET pdf_url = @pdf_url,
                        date_due = @date_due,
                        text = @text,
                        title = @title
                        WHERE id = @id";

            db.Execute(sql, assignment);
        }
    }
}

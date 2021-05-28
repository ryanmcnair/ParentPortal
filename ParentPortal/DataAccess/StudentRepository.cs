using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParentPortal.Models;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.EntityFrameworkCore;

namespace ParentPortal.DataAccess
{
    public class StudentRepository
    {
        const string ConnectionString = "Server=localhost;Database=ParentPortal;Trusted_Connection=True;";

        public List<Student> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM student";

            return db.Query<Student>(sql).ToList();
        }

        public List<Student> GetByClassroomID(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM student
	                        WHERE classroom_id = @id";

            return db.Query<Student>(sql, new { id = id }).ToList();
        }
    }
}

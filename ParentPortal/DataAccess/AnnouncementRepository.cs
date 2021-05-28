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
    public class AnnouncementRepository
    {
        const string ConnectionString = "Server=localhost;Database=ParentPortal;Trusted_Connection=True;";

        public List<Announcement> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM announcement";

            return db.Query<Announcement>(sql).ToList();
        }

        public Announcement Get(int id)
        {
            var sql = @"SELECT *
                        FROM announcement
                        WHERE id = @id";

            using var db = new SqlConnection(ConnectionString);

            return db.QueryFirstOrDefault<Announcement>(sql, new { id = id });

        }

        public void Add(Announcement announcement)
        {
            var sql = @"INSERT INTO [dbo].[announcement]
                        ([school_id]
                        ,[publisher_id]
                        ,[pdf_url]
                        ,[date_added]
                        ,[text]
                        ,[staff_only])
                        OUTPUT INSERTED.id 
                        VALUES
                        (@school_id, @publisher_id, @pdf_url, CURRENT_TIMESTAMP, @text, @staff_only)";

            using var db = new SqlConnection(ConnectionString);

            var id = db.ExecuteScalar<int>(sql, announcement);

            announcement.id = id;
        }

        public void Remove(int id)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"DELETE
                        FROM announcement
                        WHERE id = @id";

            db.Execute(sql, new { id });
        }

        public void Update(Announcement announcement)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"UPDATE announcement
                        SET publisher_id = @publisher_id,
                            pdf_url = @pdf_url,
                            text = @text,
                            staff_only = @staff_only
                        WHERE id = @id";

            db.Execute(sql, announcement);
        }
    }
}

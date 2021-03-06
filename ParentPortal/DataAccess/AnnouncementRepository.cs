using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParentPortal.Models;
using Microsoft.Data.SqlClient;
using Dapper;


namespace ParentPortal.DataAccess
{
    public class AnnouncementRepository
    {
        const string ConnectionString = "Server=localhost;Database=ParentPortal;Trusted_Connection=True;";

        public List<Announcement> GetAll()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM announcement
                        ORDER BY date_added DESC";

            return db.Query<Announcement>(sql).ToList();
        }

        public List<Announcement> GetParentAnnouncements()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT *
                        FROM announcement
	                        WHERE staff_only = 0
                            ORDER BY date_added DESC";

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
                        ,[title]
                        ,[staff_only])
                        OUTPUT INSERTED.id 
                        VALUES
                        (@school_id, @publisher_id, @pdf_url, CURRENT_TIMESTAMP, @text, @title, @staff_only)";

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
                            title = @title,
                            staff_only = @staff_only
                        WHERE id = @id";

            db.Execute(sql, announcement);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPortal.Models
{
    public class Announcement
    {
        public int id { get; set; }
        public int school_id { get; set; }
        public int publisher_id { get; set; }
        public string pdf_url { get; set; }
        public DateTime date_added { get; set; }
        public string text { get; set; }
        public bool staff_only { get; set; }
    }
}

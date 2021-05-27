using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPortal.Models
{
    public class Assignment
    {
        public int id { get; set; }
        public int classroom_id { get; set; }
        public int teacher_id { get; set; }
        public string pdf_url { get; set; }
        public DateTime date_added { get; set; }
        public DateTime date_due { get; set; }
        public string text { get; set; }
    }
}

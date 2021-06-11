using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPortal.Models
{
    public class User
    {
        public int id { get; set; }
        public int classroom_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public bool is_teacher { get; set; }
        public bool is_parent { get; set; }
        public bool is_admin { get; set; }
        public int student_id { get; set; }
        public string fb_uid { get; set; }
        public string email { get; set; }
        public bool is_registered { get; set; }
    }
}

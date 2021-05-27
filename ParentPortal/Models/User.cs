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
        public string name { get; set; }
        public bool is_teacher { get; set; }
        public bool is_parent { get; set; }
        public bool is_admin { get; set; }
        public string fb_uid { get; set; }
    }
}

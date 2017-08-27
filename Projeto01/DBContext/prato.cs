namespace Projeto01.DBContext
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("prato")]
    public partial class prato
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }

        [StringLength(100)]
        public string nome { get; set; }

        public double? preco { get; set; }

        public long? restaurantefk { get; set; }
        [ForeignKey("restaurantefk")] 
        public virtual restaurante restaurante { get; set; }
    }
}

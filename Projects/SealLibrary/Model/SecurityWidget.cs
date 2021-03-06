﻿using DynamicTypeDescriptor;
using Seal.Converter;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing.Design;
using System.Linq;
using System.Text;
using System.Windows.Forms.Design;
using System.Xml.Serialization;

namespace Seal.Model
{
    public class SecurityWidget : RootEditor
    {
        #region Editor
        protected override void UpdateEditorAttributes()
        {
            if (_dctd != null)
            {
                //Disable all properties
                foreach (var property in Properties) property.SetIsBrowsable(false);
                //Then enable
                GetProperty("ReportName").SetIsBrowsable(true);
                GetProperty("Tag").SetIsBrowsable(true);
                GetProperty("Name").SetIsBrowsable(true);
                GetProperty("Right").SetIsBrowsable(true);

                TypeDescriptor.Refresh(this);
            }
        }
        #endregion


        string _reportName;
        [Category("Definition"), DisplayName("\tReport Name"), Description("The name of the report containing the widget (optional)."), Id(1, 1)]
        public string ReportName
        {
            get { return _reportName; }
            set { _reportName = value; }
        }

        string _tag;
        [Category("Definition"), DisplayName("Security Tag"), Description("The name of the security tag (must match with the tags defined in the widgets)."), Id(2,1)]
        public string Tag
        {
            get { return _tag; }
            set { _tag = value; }
        }

        string _name;
        [Category("Definition"), DisplayName("Name"), Description("The name of the widget (must match with name defined in the widgets)."), Id(3, 1)]
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        EditorRight _right = EditorRight.NoSelection;
        [Category("Rights"), DisplayName("Widget Right"), Description("The right applied for the widget having this security tag or this name."), Id(1, 2)]
        [TypeConverter(typeof(NamedEnumConverter))]
        [DefaultValue(EditorRight.NoSelection)]
        public EditorRight Right
        {
            get { return _right; }
            set {
                _right = value;
            }
        }

        [XmlIgnore]
        public string DisplayName
        {
            get
            {
                var result = "";
                if (!string.IsNullOrEmpty(ReportName)) result = "Report Name:" + ReportName;
                if (!string.IsNullOrEmpty(Name)) result += (result != "" ? "; " : "") + "Widget Name:" + Name;
                if (!string.IsNullOrEmpty(Tag)) result += (result != "" ? "; " : "") + "Tag:" + Tag;
                return result;
            }
        }
    }
}

$(window).on('load', function (event) {

    // Dashboard
  
    var is_fta = false;
    var is_life = true;
  
    if(is_fta){
      $("section.section-afyp-fyp").hide()
      $("section.section-persistency-cpd.life").hide();
      $("section.section-fycc-afyc").show()
      $("section.section-persistency-cpd.fta").show();
    }
  
    if(is_life){
      $("section.section-fycc-afyc").hide()
      $("section.section-persistency-cpd.fta").hide();
      $("section.section-afyp-fyp").show()
      $("section.section-persistency-cpd.life").show();
    }
  
    // User Roles
  
    var is_agency_manager = false;
    var is_group_agency_manager = false;
    var is_agency_development_executive = false;
    var is_area_manager = false;
    var is_admin = true;
  
    if (is_agency_manager || is_group_agency_manager || is_agency_development_executive || is_area_manager || is_admin) {
      $("section.section-agent-performance").show();
    }
  
    if (is_group_agency_manager) {r
      $(".agency-manager").show();
    }
  
    if (is_agency_development_executive) {
      $(".agency-manager").show();
      $(".group-agency-manager").show();
    }
  
    if (is_area_manager) {
      $(".agency-manager").show();
      $(".group-agency-manager").show();
      $(".agency-development-executive").show();
    }
  
    if (is_admin) {
      $(".agency-manager").show();
      $(".group-agency-manager").show();
      $(".agency-development-executive").show();
      $(".area-manager").show();
      $(".admin").show();
    }

});
document.writeln("<!DOCTYPE html>");
document.writeln("<html lang=\'en\'>");
document.writeln("<head lang=\'en\'>");
document.writeln("    <meta charset=\'UTF-8\'>");
document.writeln("    <title></title>");
document.writeln("</head>");
document.writeln("<body>");
document.writeln("<nav class=\'navbar navbar-expand-lg navbar-light topbar static-top shadow-sm bg-white osahan-nav-top px-0\'>");
document.writeln("    <div class=\'container\' id=\'header\'>");
document.writeln("        <!-- Sidebar Toggle (Topbar) -->");
document.writeln("        <a class=\'navbar-brand\' href=\'index.html\'><img src=\'images/personal/xuezhe.png\' alt=\'\'></a>");
document.writeln("        <!-- Topbar Search -->");
document.writeln("        <form class=\'d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 col-sm-4\'>");
document.writeln("            <div class=\'input-group\'>");
document.writeln("                <input type=\'text\' class=\'form-control bg-white small\' placeholder=\'搜索课程\' v-model=\'word\' aria-label=\'Search\' aria-describedby=\'basic-addon2\'>");
document.writeln("                <div class=\'input-group-append\'>");
document.writeln("                    <button class=\'btn btn-outline-success\' type=\'button\' @click=\'search()\'>");
document.writeln("                        <i class=\'fa fa-search fa-sm\'></i>");
document.writeln("                    </button>");
document.writeln("                </div>");
document.writeln("            </div>");
document.writeln("        </form>");
document.writeln("        <!-- Topbar Navbar -->");
document.writeln("        <ul class=\'navbar-nav align-items-center ml-auto\'>");
document.writeln("            <li class=\'nav-item dropdown no-arrow no-caret mr-3 dropdown-notifications d-sm-none\'>");
document.writeln("                <a class=\'btn btn-icon btn-transparent-dark dropdown-toggle\' href=\'#\' id=\'searchDropdown\' role=\'button\' data-toggle=\'dropdown\' aria-haspopup=\'true\' aria-expanded=\'false\'>");
document.writeln("                    <i class=\'fa fa-search fa-fw\'></i>");
document.writeln("                </a>");
document.writeln("                <!-- Dropdown - Messages -->");
document.writeln("                <div class=\'dropdown-menu dropdown-menu-right p-3 shadow-sm animated--grow-in\' aria-labelledby=\'searchDropdown\'>");
document.writeln("                    <form class=\'form-inline mr-auto w-100 navbar-search\'>");
document.writeln("                        <div class=\'input-group\'>");
document.writeln("                            <input type=\'text\' class=\'form-control bg-light border-0 small\' placeholder=\'搜索课程\' aria-label=\'Search\' aria-describedby=\'basic-addon2\'>");
document.writeln("                            <div class=\'input-group-append\'>");
document.writeln("                                <button class=\'btn btn-primary\' type=\'button\'>");
document.writeln("                                    <i class=\'fa fa-search fa-sm\'></i>");
document.writeln("                                </button>");
document.writeln("                            </div>");
document.writeln("                        </div>");
document.writeln("                    </form>");
document.writeln("                </div>");
document.writeln("            </li>");
document.writeln("            <button type=\'button\' class=\'btn btn-outline-success m-2\' onclick=\'\'>我的课程</button>");
document.writeln("<!--            <li>-->");
document.writeln("<!--                <a href=\'index.html\'>我的课程&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a>-->");
document.writeln("<!--            </li>-->");
document.writeln("            <li class=\'nav-item dropdown no-arrow no-caret dropdown-user\'>");
document.writeln("                <a class=\'btn btn-icon btn-transparent-dark dropdown-toggle\' id=\'navbarDropdownUserImage\' href=\'javascript:void(0);\' role=\'button\' data-toggle=\'dropdown\' aria-haspopup=\'true\' aria-expanded=\'false\'><img class=\'img-fluid\' src=\'images/icon/avatar.png\'></a>");
document.writeln("                <div class=\'dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up\' aria-labelledby=\'navbarDropdownUserImage\'>");
document.writeln("                    <h5 class=\'dropdown-header d-flex align-items-center\'>");
document.writeln("                    <a class=\'dropdown-item\' href=\'perInfo.html\'>");
document.writeln("                        <img class=\'dropdown-user-img rounded-circle\' src=\'images/icon/avatar.png\'>");
document.writeln("                        <div class=\'dropdown-user-details\'>");
document.writeln("                            <div class=\'dropdown-user-details-name\'>{{name}}</div>");
document.writeln("                            <div class=\'dropdown-user-details-email\'>{{email}}</div>");
document.writeln("                        </div>");
document.writeln("                    </a>");
document.writeln("                    </h5>");
document.writeln("                    <div class=\'dropdown-divider\'></div>");
document.writeln("                    <a class=\'dropdown-item\' href=\'JavaScript:logout();\'>");
document.writeln("<!--                        <div class=\'dropdown-item-icon\'>-->");
document.writeln("<!--                            <svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\' class=\'feather feather-log-out\'>-->");
document.writeln("<!--                                <path d=\'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\'></path>-->");
document.writeln("<!--                                <polyline points=\'16 17 21 12 16 7\'></polyline>-->");
document.writeln("<!--                                <line x1=\'21\' y1=\'12\' x2=\'9\' y2=\'12\'></line>-->");
document.writeln("<!--                            </svg>-->");
document.writeln("<!--                        </div>-->");
document.writeln("                        退出登录");
document.writeln("                    </a>");
document.writeln("                </div>");
document.writeln("            </li>");
document.writeln("        </ul>");
document.writeln("    </div>");
document.writeln("</nav>");
document.writeln("</body>");
document.writeln("</html>");
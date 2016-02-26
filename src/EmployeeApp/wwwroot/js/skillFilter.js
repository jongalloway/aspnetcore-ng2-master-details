System.register(['./refData'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var refData_1;
    var SKILL_TEMPLATE, FILTER_TITLE, SkillFilter;
    return {
        setters:[
            function (refData_1_1) {
                refData_1 = refData_1_1;
            }],
        execute: function() {
            SKILL_TEMPLATE = '<label style="border: 1px solid lightgrey; margin: 4px; padding: 4px; display: inline-block;">' +
                '  <span>' +
                '    <div style="text-align: center;">SKILL_NAME</div>' +
                '    <div>' +
                '      <input type="checkbox"/>' +
                '      <img src="/images/skills/SKILL.png" width="30px"/>' +
                '    </div>' +
                '  </span>' +
                '</label>';
            FILTER_TITLE = '<div style="text-align: center; background: lightgray; width: 100%; display: block; border-bottom: 1px solid grey;">' +
                '<b>TITLE_NAME</b>' +
                '</div>';
            class SkillFilter {
                init(params) {
                    this.filterChangedCallback = params.filterChangedCallback;
                    this.model = {
                        android: false,
                        css: false,
                        html5: false,
                        mac: false,
                        windows: false
                    };
                }
                ;
                getGui() {
                    var eGui = document.createElement('div');
                    eGui.style.width = '380px';
                    var eInstructions = document.createElement('div');
                    eInstructions.innerHTML = FILTER_TITLE.replace('TITLE_NAME', 'Custom Skills Filter');
                    eGui.appendChild(eInstructions);
                    var that = this;
                    refData_1.default.IT_SKILLS.forEach(function (skill, index) {
                        var skillName = refData_1.default.IT_SKILLS_NAMES[index];
                        var eSpan = document.createElement('span');
                        var html = SKILL_TEMPLATE.replace("SKILL_NAME", skillName).replace("SKILL", skill);
                        eSpan.innerHTML = html;
                        var eCheckbox = eSpan.querySelector('input');
                        eCheckbox.addEventListener('click', function () {
                            that.model[skill] = eCheckbox.checked;
                            that.filterChangedCallback();
                        });
                        eGui.appendChild(eSpan);
                    });
                    return eGui;
                }
                ;
                doesFilterPass(params) {
                    var rowSkills = params.data.skills;
                    var model = this.model;
                    var passed = true;
                    refData_1.default.IT_SKILLS.forEach(function (skill) {
                        if (model[skill]) {
                            if (!rowSkills[skill]) {
                                passed = false;
                            }
                        }
                    });
                    return passed;
                }
                ;
                isFilterActive() {
                    var model = this.model;
                    var somethingSelected = model.android || model.css || model.html5 || model.mac || model.windows;
                    return somethingSelected;
                }
                ;
            }
            exports_1("default", SkillFilter);
        }
    }
});
//# sourceMappingURL=skillFilter.js.map
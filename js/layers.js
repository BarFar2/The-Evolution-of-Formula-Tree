//function n(a) {
//    return new OmegaNum(a);
//}
var fd = ""
function formulaDt() {
    return "<br>当前公式:" + fd;
}
addLayer("fo", {
    name: "formula", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: "side", // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    startData() { return {
        //part1
        unlocked: true,
		points: new OmegaNum(0),
        formula: "",
        dt: "",
        t: new OmegaNum(0),
    }},
    color: "white",
    resource: "公式等级", // Name of prestige currency
    requires: new OmegaNum(10),
    baseResource: "points", 
    baseAmount() {return player.points},
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 114514,
    exponent: 114514,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        
        //if (player.fo.points.eq(0)) { 
        //    fn = "P = t = " + format(player.fo.t);
        //} else if (player.fo.points.eq(1)) { 
        //    fn = "P = a * t = " + format(player.a.a) + " * " + format(player.fo.t) + " = " + format(player.points);
        //} 

        if (hasMilestone("fo",1)) {
            player.fo.milestones = [0];
            player.fo.points = new OmegaNum(1);
        }

        //点数
        if (player.fo.points.eq(0)) { 
            player.points = player.fo.t;
        } else if (player.fo.points.eq(1)) { 
            player.points = player.a.a.mul(player.fo.t);
        } 
        fd = player.fo.formula;
        
        mult = new OmegaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new OmegaNum(1)
    },
    
    //layerShown(){return player.v.total.gte(1)},
    //effectDescription() {
    //    return formulaDt();
    //},
    effectDescription() {
        //var fm = "";
        if (player.fo.points.eq(0)) { 
            fm = "P = t = " + format(player.fo.t);
        } else if (player.fo.points.eq(1)) { 
            fm = "P = a * t = " + format(player.a.a) + " * " + format(player.fo.t) + " = " + format(player.points);
        } 
        return "<br>当前公式: " + fm;
    },
    milestones: {
        0: {
            requirementDescription: "1 公式等级",
            effectDescription: "开始游戏，解锁a",
            done() { return player.fo.points.gte(1) },
        },
        1: {
            requirementDescription: "Go Home",
            effectDescription: "千万不要获得第二个公式等级，否则你会后悔",
            done() { return player.fo.points.gte(2) },
        },
    },
    //clickables: {
        //part1
        //11: {
        //    canClick(){return true},
        //    display() {return `Update the game<br />You've updated ${Utimeformat(player.u.updtime)}.<br /><br />Now you are doing:${updtxt[player.u.doing]}`},
        //    onClick(){player.u.doing = "upd"}
        //},
    //},
    /*
    upgrades: {
        11: {
            description: "next update is in 5 hours。",
            cost(){return new OmegaNum(5)},
            unlocked(){return true},
            currencyDisplayName:"hours of update time"
        },
    },
    */
    /*
    challenges: {
        11: {
            name: "AntiLooperrrr",
            challengeDescription: "因为挑战出了bug，devU13被禁用了。刷新后的第一帧时间计数x100。",
            canComplete(){return player.points.gte(1e10)},
            goalDescription(){return format(OmegaNum(1e10))+"点数"},
            rewardDisplay(){return `你永远保留dev11的效果，同时“刷新后的第一帧时间计数x100。”被保留。`},
            unlocked(){return hasUpgrade("dev",15)}
        },
    },
    */

    update(diff) {
        //刷新t
        player.fo.t = player.fo.t.add(new OmegaNum(1).mul(diff));
    },
    doReset(layer) {
        player.fo.t = new OmegaNum(0);
        if (layer == "fo") {
            player.a.points = new OmegaNum(0);
            player.a.milestones = [];
            player.a.upgrades = [];
            for (var i = 1; i <= 2; i++) {
                setBuyableAmount("a", 10 + i, new OmegaNum(0));
            }
            player.a.aazt = 0;
        }
    },

})

var fda = ""
function formulaDta() {
    return "<br>" + fda;
}

addLayer("a", {
    name: "a", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "a", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: "0", // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    startData() { return {
        //part1
        unlocked: true,
		points: new OmegaNum(0),
        a: new OmegaNum(1),
        a1: new OmegaNum(1),
        a2: new OmegaNum(1),
        a3: new OmegaNum(1),
        aazt: 0,
        mid: 0,
    }},
    color: "#FFF050",
    resource: "ap", // Name of prestige currency
    requires: new OmegaNum(10),
    baseResource: "points", 
    baseAmount() {return player.points},
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5,
    b() {var fp = player.fo.points.toNumber()
        switch(fp){
        case 0:return `P = t = ${player.fo.t}`
        case 1:return `P = a * t = ${player.a.points} * ${player.fo.t}`
        }},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        

        
        
        if (!hasUpgrade("a",11)) { 
            player.a.a1 = getBuyableAmount("a", 11).add(1)
        } else if (hasUpgrade("a",11) && !hasUpgrade("a",12)) { 
            player.a.a1 = getBuyableAmount("a", 11).add(2).add(getBuyableAmount("a", 12))
        } else if (hasUpgrade("a",11) && hasUpgrade("a",12)) { 
            player.a.a1 = getBuyableAmount("a", 11).add(1).add(getBuyableAmount("a", 12).add(1).mul(player.points.add(10).log10().pow(1.33)))
        }
        if (!hasUpgrade("a",13)) {
            player.a.a2 = getBuyableAmount("a", 12).add(1)
        } else {
            player.a.a2 = getBuyableAmount("a", 12).add(1).add(getBuyableAmount("a", 11).mul(0.5))
        }

        player.a.a = player.a.a1.mul(player.a.a2).mul(player.a.a3)

        mult = new OmegaNum(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
       
        
        return new OmegaNum(1)
    },
    
    layerShown(){return hasMilestone("fo",0)},
    effectDescription() {
        var fm = ""
        if (!hasMilestone("a",0)) { 
            fm = "a = 1";
        } else if (hasMilestone("a",0) && !hasMilestone("a",1)) {
            fm = "a = a1 = " + format(player.a.a1) + "<br>a1 = 1 + " + format(getBuyableAmount("a", 11)) + " = " + format(getBuyableAmount("a", 11).add(1));
        } else if (hasMilestone("a",1) && !hasUpgrade("a",11)) {
            fm = "a = a1 * a2 = " + format(player.a.a1) + " * " + format(player.a.a2) + " = " + format(player.a.a) + "<br>a1 = 1 + " + format(getBuyableAmount("a", 11)) + " = " + format(player.a.a1) + "<br>a2 = 1 + " + format(getBuyableAmount("a", 12)) + " = " + format(player.a.a2);
        } else if (hasMilestone("a",1) && hasUpgrade("a",11) && !hasUpgrade("a",12)) {
            fm = "a = a1 * a2 = " + format(player.a.a1) + " * " + format(player.a.a2) + " = " + format(player.a.a) + "<br>a1 = 1 + " + format(getBuyableAmount("a", 11)) + " + " + format(player.a.a2) + " = " + format(player.a.a1) + "<br>a2 = 1 + " + format(getBuyableAmount("a", 12)) + " = " + format(player.a.a2);
        } else if (hasMilestone("a",1) && hasUpgrade("a",12) && !hasUpgrade("a",13)) {
            fm = "a = a1 * a2 = " + format(player.a.a1) + " * " + format(player.a.a2) + " = " + format(player.a.a) + "<br>a1 = 1 + " + format(getBuyableAmount("a", 11)) + " + " + format(player.a.a2) + " * " + format(player.points.add(10).log10().pow(1.33)) + " = " + format(player.a.a1) + "<br>a2 = 1 + " + format(getBuyableAmount("a", 12)) + " = " + format(player.a.a2);
        } else if (hasMilestone("a",1) && hasUpgrade("a",13)) {
            fm = "a = a1 * a2 = " + format(player.a.a1) + " * " + format(player.a.a2) + " = " + format(player.a.a) + "<br>a1 = 1 + " + format(getBuyableAmount("a", 11)) + " + " + format(player.a.a2) + " * " + format(player.points.add(10).log10().pow(1.33)) + " = " + format(player.a.a1) + "<br>a2 = 1 + " + format(getBuyableAmount("a", 12)) + " + " + format(getBuyableAmount("a", 11)) + " * 0.5 = " + format(player.a.a2);
        }
        return "<br>" + fm;
    },// + "<br>a1 = " + format(getBuyableAmount("a", 11).add(1)) + "<br>a2 = " + format(getBuyableAmount("a", 12).add(1))
    //player.points.add(10).log10().pow(1.33)
    clickables: {
        11: {
            canClick(){return true},
            display() {
                if (player.a.aazt == 0) {
                    return "启用自动a重置"
                } else if (player.a.aazt == 1) {
                    return "关闭自动a重置"
                }
            },
            onClick(){
                if (player.a.aazt == 0) {
                    player.a.aazt = 1
                } else if (player.a.aazt == 1) {
                    player.a.aazt = 0
                }
            },
            unlocked(){ return hasMilestone("a",2)}
        },
    },
    milestones: {
        0: {
            requirementDescription: "1 ap",
            effectDescription: "解锁B11",
            done() { return player.a.points.gte(1) },
        },
        1: {
            requirementDescription: "5 B11数量",
            effectDescription: "解锁B12",
            done() { return getBuyableAmount("a", 11).gte(5) },
            unlocked(){return hasMilestone('a',0)}
        },
        2: {
            requirementDescription: "4 B12数量",
            effectDescription: "解锁一个垃圾升级,而且你可以自动a重置(每秒10次)",
            done() { return getBuyableAmount("a", 12).gte(4) },
            unlocked(){return hasMilestone('a',1)}
        },
        3: {
            requirementDescription: "1333 a",
            effectDescription: "B11价格(n+1)^2 -> (n+1)^1.5,B12价格(n+1)^3 -> (n+1)^2.5",
            done() { return player.a.a.gte(1333) },
            unlocked(){return hasMilestone('a',2)}
        },
        4: {
            requirementDescription: "3666 a",
            effectDescription: "B11价格(n+1)^1.5 -> (n+1)^1.25,B12价格(n+1)^3 -> (n+1)^2.25",
            done() { return player.a.a.gte(3666) },
            unlocked(){return hasMilestone('a',3)}
        },
    },
    buyables: {
        11: {
            unlocked() { return hasMilestone("a",0)},
            cost() { 
                if (!hasMilestone("a",3)) {
                    return new OmegaNum(1).mul(getBuyableAmount("a", 11).add(1).pow(2)) 
                } else if (hasMilestone("a",3) && !hasMilestone("a",4)) {
                    return new OmegaNum(1).mul(getBuyableAmount("a", 11).add(1).pow(1.5)) 
                } else if (hasMilestone("a",3) && !hasMilestone("a",999)) {
                    return new OmegaNum(1).mul(getBuyableAmount("a", 11).add(1).pow(1.25)) 
                }
            },
            title() { return "B11 增加a1"},
            display() { 
                var eff = ""
                if (!hasUpgrade("a",13)) { eff = "使a1增加1";} else {eff = "使a1增加1,同时使a2增加0.5";}
                return eff + "<br>当前数量:" + format(getBuyableAmount("a", 11)) + "<br>花费:" + format(this.cost()) +"ap" 
            },
            canAfford() { return player.a.points.gte(this.cost()) },
            buy() {
                if (!hasUpgrade("a",15)) {
                    player.a.points = player.a.points.sub(this.cost())
                }
                setBuyableAmount("a", 11, getBuyableAmount("a", 11).add(1))
            },
            
        },
        12: {
            unlocked() { return hasMilestone("a",1)},
            cost() { 
                if (!hasMilestone("a",3)) {
                    return new OmegaNum(1).mul(getBuyableAmount("a", 12).add(1).pow(3)) 
                } else if (hasMilestone("a",3) && !hasMilestone("a",4)) {
                    return new OmegaNum(1).mul(getBuyableAmount("a", 12).add(1).pow(2.5)) 
                } else if (hasMilestone("a",4) && !hasMilestone("a",999)) {
                    return new OmegaNum(1).mul(getBuyableAmount("a", 12).add(1).pow(2.25)) 
                }
            },
            title() { return "B12 增加a2"},
            display() { return "使a2增加1<br>当前数量:" + format(getBuyableAmount("a", 12)) + "<br>花费:" + format(this.cost()) +"ap" },
            canAfford() { return player.a.points.gte(this.cost()) },
            buy() {
                if (!hasUpgrade("a",15)) {
                    player.a.points = player.a.points.sub(this.cost())
                }
                setBuyableAmount("a", 12, getBuyableAmount("a", 12).add(1))
            },
        },
        
    },
    
    
    upgrades: {
        11: {
            title: "垃圾升级",
            description: "a2增加a1",
            cost(){return new OmegaNum(125)},
            unlocked(){return hasMilestone("a",2)},
        },
        12: {
            title: "变废为宝",
            description(){return "\"垃圾升级\"效果*log(点数+10)^1.33<br>当前效果: *" + format(player.points.add(10).log10().pow(1.33))},
            cost(){return new OmegaNum(250)},
            unlocked(){return hasUpgrade("a",11)},
        },
        13: {
            title: "变废为宝2",
            description(){return "B11也增加0.5 a2"},
            cost(){return new OmegaNum(500)},
            unlocked(){return hasUpgrade("a",12)},
        },
        14: {
            title: "残局",
            description(){return "你完成了这个没有动力的游戏！"},//第四个和第五个里程碑的效果失效，但是购买购买项不花费ap
            cost(){return new OmegaNum(10000)},
            unlocked(){return hasUpgrade("a",13) && hasMilestone("a",4)},
        },
    },

    /*
    challenges: {
        11: {
            name: "AntiLooperrrr",
            challengeDescription: "因为挑战出了bug，devU13被禁用了。刷新后的第一帧时间计数x100。",
            canComplete(){return player.points.gte(1e10)},
            goalDescription(){return format(OmegaNum(1e10))+"点数"},
            rewardDisplay(){return `你永远保留dev11的效果，同时“刷新后的第一帧时间计数x100。”被保留。`},
            unlocked(){return hasUpgrade("dev",15)}
        },
    },
    */


    update(diff){
        if (player.a.aazt == 1) {
            player.a.mid = min(player.a.mid + diff,0.15);
            if (player.a.mid >= 0.1 && player.points.gte(10)) {
                player.a.mid = player.a.mid - 0.1;
                player.a.points = player.a.points.add(player.points.div(10).root(2));
                player.fo.t = new OmegaNum(0);
            }
        }
    }
})

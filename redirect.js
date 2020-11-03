var links = {
    Default: "home",
    "404": "index",
    games: {
        project: "theButtonCh1",
        theButtons: "theButtonCh2",
    },
    univTlse3: {
        B32: "b32",
    },
};
function getConnection(party) {
    //You can't name a command / command family with the 1st char uppercase. reserved for specials. 
    var c = -1;
    //Case sentisive, may change.
    //party = party.toLowerCase();
    var cmd = party.split("/");
    var index = 0;
    var asHelp = false;
    function verifAliases(nest) {
        console.log(nest);
        if (nest.Aliases) {
            var keys = Object.keys(nest.Aliases);
            for (i = 0; i < keys.length; i++) {
                if (keys[i] == cmd[index]) { //Found command
                    index++;
                    return searchCommand(nest[nest.Aliases[keys[i]]]);
                    i = keys.length + 1;
                }
            }
        } else {
            if (nest.Default) {
                if (nest.Default) {
                    return nest.Default;
                } else {
                    return (nest["404"] ? nest["404"] : undefined);
                }
            }
        }
    }
    function searchCommand(nest = CommandsList) {
        var keys = Object.keys(nest);
        for (i = 0; i < keys.length; i++) {
            if (keys[i] == cmd[index] && keys[i][0] == keys[i][0].toLowerCase()) { //Found command or command family, ignore specials
                if (typeof (nest[keys[i]]) == "object") { //This command has children, go to next level
                    if (cmd.length > ++index) return searchCommand(nest[keys[i]]);
                    else { //If no furthest parameter is found, exec default
                        if (nest.Default) {
                            return nest[keys[i]].Default;
                        } else {
                            return [nest[keys[i]], ...cmd.slice(index + 1, cmd.length)];
                        }
                    }
                } else {
                    if (cmd.length > index) { //Pass parameters to command
                        return [nest[keys[i]], ...cmd.slice(index + 1, cmd.length)];
                    } else { //If no furthest parameter is found, exec as it is
                        return nest[keys[i]];
                    }
                }
                i = keys.length + 1;
            }
        };
        if (i < keys.length + 1) { //If no arg recognised, check aliases
            verifAliases(nest);
        }
    };
    return searchCommand(links);
}
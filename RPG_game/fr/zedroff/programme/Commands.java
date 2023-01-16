public enum Commands {
    INVENTORY("Shows your actual inventory."), QUIT("Quits the game."), BATTLE("Battle against a random enemy of your actual level."), CARD("Shows card infos."), COLLECT("Collect a random Card"), HELP("Get the help page, if given an argument, it gives the arg command's help page.");
    public String help_msg;
    private Commands(String help_msg) {
        this.help_msg = help_msg;
    }
    public static Commands[] getCommands() {
        return Commands.values();
    }
    public static String getHelp(String command) {
        Commands[] stock = getCommands();
        String verifier = "";
        for(Commands str: stock) {
            if(str.toString().toLowerCase() == command.toLowerCase()) {
                verifier = str.help_msg;
            }
        }
        
        return verifier;
       
    }
}

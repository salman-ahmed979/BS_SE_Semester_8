import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.HashMap;
import java.util.Map;

public class FileWork {
    public static void main(String[] args) {
        try {
            File userFile = new File("filename.txt");
            HashMap<Character, Integer> symbols = new HashMap<>();
            symbols.put('+', 0);
            symbols.put('-', 0);
            symbols.put('*', 0);
            symbols.put('/', 0);
            // symbols.put('', 0);

            FileReader fr = new FileReader(userFile); // Creation of File Reader object
            BufferedReader br = new BufferedReader(fr); // Creation of BufferedReader object
            int c = 0;
            while ((c = br.read()) != -1) // Read char by Char
            {
                char character = (char) c; // converting integer to char
                System.out.println(character); // Display the Character
                if (symbols.containsKey(character)) {
                    symbols.put(character, symbols.get(character) + 1);
                }
            }
            br.close();

            System.out.println("Symbol Table:");
            for (Map.Entry<Character, Integer> entry : symbols.entrySet()) {
                System.out.println(entry.getKey() + " : " + entry.getValue());
            }

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
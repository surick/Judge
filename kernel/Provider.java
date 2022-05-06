import java.util.Map;

/**
 * @author Jin
 * @since 2022/5/6
 */
public class Provider {

    public static void add(Map<String, Boolean> result) {

        ResultsQueue.add(result);
    }
}

import java.util.Map;
import java.util.Queue;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * @author Jin
 * @since 2022/5/6
 */
public class ResultsQueue {
    public static final Queue<Map<String, Boolean>> RESULTS = new LinkedBlockingQueue<>();

    public static void add(Map<String, Boolean> result) {
        RESULTS.offer(result);
    }
}

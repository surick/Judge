import java.util.Queue;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * @author Jin
 * @since 2022/5/6
 */
public class ReceiveQueue {
    public static final Queue<String> EVENTS = new LinkedBlockingQueue<>();

    public static void add(String event) {
        EVENTS.offer(event);
    }
}

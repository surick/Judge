/**
 * @author Jin
 * @since 2022/5/6
 */
public class Receiver {

    public static void appeal(String event) {
        ReceiveQueue.add(event);
    }
}

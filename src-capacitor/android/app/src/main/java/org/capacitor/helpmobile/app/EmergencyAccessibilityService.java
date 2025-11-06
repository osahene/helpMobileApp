package org.capacitor.helpmobile.app; // Match your package name
import android.accessibilityservice.AccessibilityService;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.view.KeyEvent;
import android.view.accessibility.AccessibilityEvent;
import android.widget.Toast;
import android.util.Log;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;
import org.capacitor.helpmobile.app.VolumeListenerPlugin;

public class EmergencyAccessibilityService extends AccessibilityService {

    private static EmergencyAccessibilityService sRunningServiceInstance;
    private static final String TAG = "EmergencyAccService";
    private static final long PRESS_TIMEOUT_MS = 1000; // Max time between consecutive presses
    private static final int REQUIRED_PRESSES = 4;
    private static final long CANCEL_TIMEOUT_MS = 5000; // 5 seconds for cancellation
    private int pressCount = 0;
    private long lastPressTime = 0;
    private Handler handler;
    private Runnable cancelAlertRunnable;
    private boolean alertSequenceActive = false;
    private static VolumeListenerPlugin pluginInstance;
    public static EmergencyAccessibilityService getRunningServiceInstance() {
        return sRunningServiceInstance;
    }


    public static void setPluginInstance(VolumeListenerPlugin plugin) {
        pluginInstance = plugin;
    }
    // --- Lifecycle Methods ---

    @Override
    public void onCreate() {
        super.onCreate();        
        sRunningServiceInstance = this; // Store reference
        Log.d(TAG, "EmergencyAccessibilityService created.");
        handler = new Handler(Looper.getMainLooper());
    }

    @Override
    protected void onServiceConnected() {
        super.onServiceConnected();
        Log.d(TAG, "EmergencyAccessibilityService connected.");
        Toast.makeText(this, "Emergency Alert Listener Enabled", Toast.LENGTH_SHORT).show();
    }

    @Override
    public boolean onKeyEvent(KeyEvent event) {
        if (event.getAction() == KeyEvent.ACTION_DOWN) {
            int keyCode = event.getKeyCode();
            long currentTime = System.currentTimeMillis();
            if (keyCode == KeyEvent.KEYCODE_VOLUME_UP || keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
                Log.d(TAG, "Volume button pressed. KeyCode: " + keyCode);
                if (alertSequenceActive) {
                    Log.d(TAG, "Alert sequence already active. Ignoring further presses for counter.");
                    return true;
                }
                if (currentTime - lastPressTime < PRESS_TIMEOUT_MS) {
                    pressCount++;
                    Log.d(TAG, "Press count: " + pressCount);
                } else {
                    pressCount = 1;
                    Log.d(TAG, "Press count reset to 1 due to timeout.");
                }
                lastPressTime = currentTime;
                if (pressCount >= REQUIRED_PRESSES) {
                    Log.d(TAG, "Required presses reached! Initiating 5-second countdown.");
                    pressCount = 0; // Reset for next sequence
                    initiateAlertCountdown();
                }
                return true;
            }
        }
        return super.onKeyEvent(event);
    }
    private void initiateAlertCountdown() {
        if (alertSequenceActive) {
            handler.removeCallbacks(cancelAlertRunnable);
        }
        alertSequenceActive = true;
        if (pluginInstance != null) {
            JSObject data = new JSObject();
            data.put("status", "countdown_started");
            pluginInstance.notifyListeners("onAlertSequence", data, true); // Use true for retain
        }
        Toast.makeText(this, "Emergency Alert imminent! Press ANY volume button again within 5s to cancel.", Toast.LENGTH_LONG).show();
        cancelAlertRunnable = new Runnable() {
            @Override
            public void run() {
                if (alertSequenceActive) {
                    Log.d(TAG, "5-second countdown elapsed. Triggering alert!");
                    triggerEmergencyAlert();
                    alertSequenceActive = false;
                }
            }
        };
        handler.postDelayed(cancelAlertRunnable, CANCEL_TIMEOUT_MS);
    }

    public void cancelAlertSequence() {
        if (alertSequenceActive) {
            handler.removeCallbacks(cancelAlertRunnable);
            alertSequenceActive = false;
            pressCount = 0; // Reset counter completely
            Log.d(TAG, "Alert sequence cancelled by user.");
            Toast.makeText(this, "Emergency Alert Cancelled.", Toast.LENGTH_SHORT).show();
            if (pluginInstance != null) {
                JSObject data = new JSObject();
                data.put("status", "cancelled");
                pluginInstance.notifyListeners("onAlertSequence", data, true);
            }
        }
    }

    private void triggerEmergencyAlert() {
        Log.d(TAG, "!!!!! EMERGENCY ALERT TRIGGERED !!!!!");
        if (pluginInstance != null) {
            JSObject data = new JSObject();
            data.put("status", "triggered");
            pluginInstance.notifyListeners("onAlertSequence", data, true);

        } else {
            Log.e(TAG, "Plugin instance not set. Cannot notify Quasar.");
        }
    }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
    }
    
    @Override
    public void onInterrupt() {
        Log.d(TAG, "EmergencyAccessibilityService interrupted.");
    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        if (handler != null) {
            handler.removeCallbacksAndMessages(null);
        }
        alertSequenceActive = false;
        pressCount = 0;
        sRunningServiceInstance = null;
        Log.d(TAG, "EmergencyAccessibilityService destroyed.");
        Toast.makeText(this, "Emergency Alert Listener Disabled", Toast.LENGTH_SHORT).show();
    }
} 
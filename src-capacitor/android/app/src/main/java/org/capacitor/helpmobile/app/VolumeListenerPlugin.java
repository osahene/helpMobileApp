package org.capacitor.helpmobile.app; // Match your package name
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;
import org.json.JSONException;
@CapacitorPlugin(name = "VolumeListener")

public class VolumeListenerPlugin extends Plugin {
    private static final String TAG = "VolumeListenerPlugin";
    @Override
    public void load() {
        super.load();
        EmergencyAccessibilityService.setPluginInstance(this);
    }
    @PluginMethod()
    public void isAccessibilityServiceEnabled(PluginCall call) {
        Context context = getContext();
        boolean isEnabled = isEmergencyAccessibilityServiceEnabled(context);
        JSObject ret = new JSObject();
        ret.put("enabled", isEnabled);
       call.resolve(ret);
    }

    @PluginMethod()
    public void requestAccessibilityServicePermission(PluginCall call) {
        Context context = getContext();
        try {
            Intent intent = new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); // Important for opening from a plugin
            context.startActivity(intent);
            call.resolve();
        } catch (Exception e) {
            call.reject("Failed to open accessibility settings: " + e.getMessage());
        }
    }

    @PluginMethod()
    public void startListening(PluginCall call) {
        Context context = getContext();
        if (!isEmergencyAccessibilityServiceEnabled(context)) {
            call.reject("Accessibility Service not enabled. Please enable it in settings.");
            return;
        }
        call.resolve();

    }


    @PluginMethod()
    public void stopListening(PluginCall call) {
        Context context = getContext();
        cancelActiveAlertSequence(call);
        call.resolve();
    }

    @PluginMethod()
    public void cancelAlert(PluginCall call) {
        EmergencyAccessibilityService service = EmergencyAccessibilityService.getRunningServiceInstance();
        if (service != null) {
            service.cancelAlertSequence();
            call.resolve();
        } else {
            call.reject("Accessibility Service not running or accessible to cancel.");
            Log.w(TAG, "Accessibility service not running when cancelAlert called.");
        }
    }


    private void cancelActiveAlertSequence(PluginCall call) {
        EmergencyAccessibilityService serviceInstance = EmergencyAccessibilityService.getRunningServiceInstance(); // This method doesn't exist yet, see below
        if (serviceInstance != null) {
            serviceInstance.cancelAlertSequence();
            call.resolve();
        } else {
            Log.w(TAG, "Accessibility service not running or accessible to cancel directly.");
            call.reject("Accessibility service not active or accessible for cancellation.");
        }
    }

    /**

     * Checks if the EmergencyAccessibilityService is enabled.
     * @param context The application context.
     * @return true if the service is enabled, false otherwise.
     */

    private boolean isEmergencyAccessibilityServiceEnabled(Context context) {
        String service = context.getPackageName() + "/" + EmergencyAccessibilityService.class.getName();
        int accessibilityEnabled = 0;
        try {
            accessibilityEnabled = Settings.Secure.getInt(context.getContentResolver(),
                    Settings.Secure.ACCESSIBILITY_ENABLED);
        } catch (Settings.SettingNotFoundException e) {
            Log.e(TAG, "Error finding setting, ACCESSIBILITY_ENABLED", e);
            return false;
        }
        TextUtils.SimpleStringSplitter colonSplitter = new TextUtils.SimpleStringSplitter(':');
        if (accessibilityEnabled == 1) {
            Log.v(TAG, "***ACCESSIBILITY IS ENABLED***");
            String settingValue = Settings.Secure.getString(context.getContentResolver(),
                    Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
            if (settingValue != null) {
                colonSplitter.setString(settingValue);
                while (colonSplitter.hasNext()) {
                    String accessibilityService = colonSplitter.next();
                    Log.v(TAG, "-->ACCESSIBILITY_SERVICE: " + accessibilityService);
                    if (accessibilityService.equalsIgnoreCase(service)) {
                        Log.v(TAG, "We've found the correct setting - " + service);
                        return true;
                    }
                }
            }
        } else {
            Log.v(TAG, "***ACCESSIBILITY IS DISABLED***");
        }
        return false;
    }
    public void notifyListeners(String eventName, JSObject data, boolean retainUntilConsumed) {
        super.notifyListeners(eventName, data, retainUntilConsumed);
    }
}


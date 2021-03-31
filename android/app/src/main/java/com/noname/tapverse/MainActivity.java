package com.noname.tapverse;

import android.content.pm.ActivityInfo;
import android.content.res.Configuration;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "TapVerse";
    }
}

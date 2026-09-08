// ===================== BATTERY API =====================
let currentBatteryLevel = 66;
let isCharging = false;

function updateBatteryUI(level, charging) {
    currentBatteryLevel = Math.round(level);
    isCharging = charging;

    // Phone mode battery
    const phoneLevelEl = document.getElementById('phoneBatteryLevel');
    const phoneTextEl = document.getElementById('phoneBatteryText');
    if (phoneLevelEl) {
        phoneLevelEl.style.width = `${currentBatteryLevel}%`;
        if (currentBatteryLevel > 50) {
            phoneLevelEl.style.backgroundColor = '#22c55e';
        } else if (currentBatteryLevel >= 20) {
            phoneLevelEl.style.backgroundColor = '#fbbf24';
        } else {
            phoneLevelEl.style.backgroundColor = '#ef4444';
        }
        if (charging) {
            phoneLevelEl.parentElement.classList.add('battery-charging');
        } else {
            phoneLevelEl.parentElement.classList.remove('battery-charging');
        }
    }
    if (phoneTextEl) {
        phoneTextEl.textContent = `${currentBatteryLevel}%${charging ? ' ⚡' : ''}`;
    }

    // macOS mode battery
    const macosBatteryEl = document.getElementById('macosBattery');
    if (macosBatteryEl) {
        macosBatteryEl.textContent = `🔋 ${currentBatteryLevel}%${charging ? ' ⚡' : ''}`;
        if (currentBatteryLevel > 50) {
            macosBatteryEl.style.color = '#22c55e';
        } else if (currentBatteryLevel >= 20) {
            macosBatteryEl.style.color = '#fbbf24';
        } else {
            macosBatteryEl.style.color = '#ef4444';
        }
    }
}

function initBatteryAPI() {
    if (!navigator.getBattery) {
        console.log('Battery API not supported');
        updateBatteryUI(100, false);
        return;
    }

    try {
        navigator.getBattery().then(battery => {
            updateBatteryUI(battery.level * 100, battery.charging);

            battery.addEventListener('levelchange', () => {
                updateBatteryUI(battery.level * 100, battery.charging);
            });

            battery.addEventListener('chargingchange', () => {
                updateBatteryUI(battery.level * 100, battery.charging);
            });

            battery.addEventListener('chargingtimechange', () => {
                updateBatteryUI(battery.level * 100, battery.charging);
            });

            battery.addEventListener('dischargingtimechange', () => {
                updateBatteryUI(battery.level * 100, battery.charging);
            });
        }).catch(err => {
            console.log('Battery API error:', err);
            updateBatteryUI(100, false);
        });
    } catch (err) {
        console.log('Battery API error:', err);
        updateBatteryUI(100, false);
    }
}

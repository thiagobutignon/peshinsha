package com.example.robsoncamanducci.floatingactionbutton;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class OnBoardSaidaActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_on_board_saida);

        final EditText edittext = (EditText) findViewById(R.id.txtSenhaConfirma);
        edittext.setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {


                if ((event.getAction() == KeyEvent.ACTION_DOWN) &&
                        (keyCode == KeyEvent.KEYCODE_ENTER)) {
                    // Perform action on key press
                    Toast.makeText(OnBoardSaidaActivity.this, "Validando Acesso " , Toast.LENGTH_SHORT).show();

                    Intent intent = new Intent(OnBoardSaidaActivity.this, MainActivity.class);
                    startActivity(intent);

                    return true;
                }
                return false;



            }

        });

    }





}

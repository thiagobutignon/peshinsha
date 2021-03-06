package com.example.robsoncamanducci.floatingactionbutton;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.KeyEvent;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class OnBoardEntradaActivity extends AppCompatActivity {



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_on_board_entrada);

        final EditText edittext = (EditText) findViewById(R.id.txtCPF);
        edittext.setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {


                if ((event.getAction() == KeyEvent.ACTION_DOWN) &&
                        (keyCode == KeyEvent.KEYCODE_ENTER)) {
                    // Perform action on key press
                    Toast.makeText(OnBoardEntradaActivity.this, edittext.getText(), Toast.LENGTH_SHORT).show();

                    Intent intent = new Intent(OnBoardEntradaActivity.this, OnBoardSaidaActivity.class);
                    startActivity(intent);

                    return true;
                }
                return false;



            }

        });


    }


}
